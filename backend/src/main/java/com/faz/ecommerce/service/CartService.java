package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.CartItemResponse;
import com.faz.ecommerce.entity.CartItem;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.entity.User;
import com.faz.ecommerce.exception.ResourceNotFoundException;
import com.faz.ecommerce.exception.UnauthorizedException;
import com.faz.ecommerce.repository.CartItemRepo;
import com.faz.ecommerce.repository.ProductRepo;
import com.faz.ecommerce.repository.UserRepo;
import com.faz.ecommerce.security.CustomUserDetails;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final UserRepo userRepo;
    private final CartItemRepo cartItemRepo;
    private final ProductRepo productRepo;

    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getId();
    }

    @Transactional
    public CartItem addToCart(Long productId, int quantity) {
        Long userId = getCurrentUserId();
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User Doesnt Exist"));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product doesnt exist"));

        Optional<CartItem> existingItem = cartItemRepo.findByUserIdAndProductId(userId, productId);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepo.save(item);
        }

        CartItem newItem = new CartItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);

        return cartItemRepo.save(newItem);
    }

    public List<CartItem> getCartItems() {
        Long userId = getCurrentUserId();
        return cartItemRepo.findByUserId(userId);
    }

    @Transactional
    public CartItem updateQuantity(Long productId, int quantity) {
        Long userId = getCurrentUserId();
        
        CartItem item = cartItemRepo.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        if (quantity <= 0) throw new IllegalArgumentException("Quantity must be greater than zero");

        item.setQuantity(quantity);
        return cartItemRepo.save(item);
    }

    @Transactional
    public void clearCart() {
        Long userId = getCurrentUserId();
        cartItemRepo.deleteAllByUserId(userId);
    }

    @Transactional
    public void removeItem(Long cartItemId) {
        Long userId = getCurrentUserId();
        
        CartItem item = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        
        // Verify the item belongs to the current user
        if (!item.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Unauthorized access to cart item");
        }
        
        cartItemRepo.deleteById(cartItemId);
    }

    public CartItemResponse mapToCartResponse(CartItem item) {
        return new CartItemResponse(
                item.getId(),
                item.getProduct().getId(),
                item.getUser().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice(),
                item.getProduct().getImageUrl(),
                item.getQuantity(),
                item.getProduct().getPrice() * item.getQuantity()
        );
    }
}
