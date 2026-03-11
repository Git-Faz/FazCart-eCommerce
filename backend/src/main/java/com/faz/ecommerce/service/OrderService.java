package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.CartItemResponse;
import com.faz.ecommerce.dto.OrderResponse;
import com.faz.ecommerce.entity.*;
import com.faz.ecommerce.enums.OrderStatus;
import com.faz.ecommerce.exception.BadRequestException;
import com.faz.ecommerce.exception.ResourceNotFoundException;
import com.faz.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.faz.ecommerce.enums.OrderStatus.*;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepo orderRepo;
    private final CartItemRepo cartItemRepo;
    private final UserRepo userRepo;

    public Order createOrderFromCart (Long userId){

        List<CartItem> cartItems = cartItemRepo.findByUserId(userId);

        if (cartItems.isEmpty()){
            throw new BadRequestException("Cart is empty");
        }

        User user = userRepo.findById(userId).
        orElseThrow(() -> new ResourceNotFoundException("User Not found"));

        //create new order
        Order order = new Order();
        order.setStatus(PROCESSING);
        order.setUser(user);

        //convert cart items to order items
        Set<OrderItem> orderItems = new HashSet<>();
        long total = 0;
        for (CartItem cartItem :  cartItems){
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(cartItem.getProduct().getPrice());

            orderItems.add(orderItem);

            total += (long) cartItem.getQuantity() * cartItem.getProduct().getPrice();
        }

        order.setItems(orderItems);
        order.setTotal(total);
        order = orderRepo.save(order);

        cartItemRepo.deleteAllByUserId(userId);

        return order;
    }

    public Page<Order> getUserOrders (Long userId, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findByUserId(userId, pageable);
    }

    public Order getOrderById (Long orderId){
        return orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepo.save(order);
    }

    private Long calculateTotalAmount(List<CartItem> cartItems) {
        return cartItems.stream()
                .mapToLong(cartItem -> (long) (cartItem.getQuantity() * cartItem.getProduct().getPrice()))
                .sum();
    }

    public OrderResponse mapToOrderResponse(Order order) {
        List<CartItemResponse> itemResponses = order.getItems().stream()
                .map(this::mapOrderItemToCartItemResponse)
                .collect(toList());

        return new OrderResponse(order.getId(), itemResponses, order.getTotal(), order.getStatus());
    }

    private CartItemResponse mapOrderItemToCartItemResponse(OrderItem orderItem) {
        return new CartItemResponse(
                orderItem.getId(),
                orderItem.getProduct().getId(),
                orderItem.getOrder().getUser().getId(),
                orderItem.getProduct().getName(),
                (long)(orderItem.getPriceAtPurchase()),
                orderItem.getProduct().getImageUrl(),
                orderItem.getQuantity(),
                (long)(orderItem.getQuantity() * orderItem.getPriceAtPurchase())
        );
    }



}
