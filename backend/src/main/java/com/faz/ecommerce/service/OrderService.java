package com.faz.ecommerce.service;

import static com.faz.ecommerce.enums.OrderStatus.*;
import static java.util.stream.Collectors.toList;

import com.faz.ecommerce.dto.CartItemResponse;
import com.faz.ecommerce.dto.OrderResponse;
import com.faz.ecommerce.entity.*;
import com.faz.ecommerce.enums.OrderStatus;
import com.faz.ecommerce.exception.BadRequestException;
import com.faz.ecommerce.exception.ResourceNotFoundException;
import com.faz.ecommerce.repository.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final CartItemRepo cartItemRepo;
    private final UserRepo userRepo;
    private final ProductRepo productRepo;

    @Transactional
    public Order createOrderFromCart(Long userId) {
        User user = userRepo
                .findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User Not found"));

        List<CartItem> cartItems = cartItemRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        // Stock validation
        for (CartItem cartItem : cartItems) {
            if (cartItem.getProduct().getStock() < cartItem.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock for product: " +
                                cartItem.getProduct().getName()
                );
            }
        }

        Order order = new Order();
        order.setStatus(PENDING);
        order.setUser(user);

        Set<OrderItem> orderItems = new HashSet<>();
        long total = 0;

        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(cartItem.getProduct().getPrice());

            orderItems.add(orderItem);

            total += (long) cartItem.getQuantity() *
                    cartItem.getProduct().getPrice();
        }

        order.setItems(orderItems);
        order.setTotal(total);

        return orderRepo.save(order);
    }

    //Payment success handler
    @Transactional
    public Order confirmOrderPayment(Long orderId) {
        Order order = getOrderById(orderId);

        if (order.getStatus() != PENDING) {
            throw new BadRequestException("Order is not in payable state");
        }

        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();

            if (product.getStock() < item.getQuantity()) {
                throw new BadRequestException(
                        "Stock changed, cannot complete order"
                );
            }

            product.setStock(product.getStock() - item.getQuantity());
            productRepo.save(product);
        }

        order.setStatus(CONFIRMED);
        cartItemRepo.deleteAllByUserId(order.getUser().getId());

        return orderRepo.save(order);
    }

    @Transactional
    public Order failOrderPayment(Long orderId) {
        Order order = getOrderById(orderId);

        if (order.getStatus() != PENDING) {
            throw new BadRequestException("Invalid state transition");
        }

        order.setStatus(FAILED);
        return orderRepo.save(order);
    }

    @Transactional(readOnly = true)
    public Page<Order> getUserOrders(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findByUserId(userId, pageable);
    }

    public Order getOrderById(Long orderId) {
        return orderRepo
                .findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found")
                );
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Invalid state transition");
        }

        order.setStatus(status);
        return orderRepo.save(order);
    }

    public OrderResponse mapToOrderResponse(Order order) {
        List<CartItemResponse> itemResponses = order
                .getItems()
                .stream()
                .map(this::mapOrderItemToCartItemResponse)
                .collect(toList());

        return new OrderResponse(
                order.getId(),
                itemResponses,
                order.getTotal(),
                order.getStatus()
        );
    }

    private CartItemResponse mapOrderItemToCartItemResponse(
            OrderItem orderItem
    ) {
        return new CartItemResponse(
                orderItem.getId(),
                orderItem.getProduct().getId(),
                orderItem.getOrder().getId(),
                orderItem.getProduct().getName(),
                (long) (orderItem.getPriceAtPurchase()),
                orderItem.getProduct().getImageUrl(),
                orderItem.getQuantity(),
                (long) (orderItem.getQuantity() * orderItem.getPriceAtPurchase())
        );
    }
}