package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.OrderResponse;
import com.faz.ecommerce.entity.Order;
import com.faz.ecommerce.enums.OrderStatus;
import com.faz.ecommerce.repository.OrderRepo;
import com.faz.ecommerce.security.CustomUserDetails;
import com.faz.ecommerce.service.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepo orderRepo;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(Authentication authentication){

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        Order newOrder = orderService.createOrderFromCart(user.getId());
        OrderResponse response = orderService.mapToOrderResponse(newOrder);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{orderId}/pay")
    public OrderResponse payOrder(@PathVariable Long orderId) {

        // dummy payment
        boolean success = Math.random() > 0.3;

        Order order;
        if (success) {
            order = orderService.confirmOrderPayment(orderId);
        } else {
            order = orderService.failOrderPayment(orderId);
        }

        return orderService.mapToOrderResponse(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById (@PathVariable Long orderId){
        Order order = orderRepo.getOrderById(orderId);
        OrderResponse response = orderService.mapToOrderResponse(order);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getUserOrders (Authentication authentication, @RequestParam int page, @RequestParam int size){

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        Page <Order> orders = orderService.getUserOrders(user.getId(), page, size );
        Page<OrderResponse> responses = orders.map(orderService::mapToOrderResponse);

        return ResponseEntity.ok(responses);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateStatus(@Valid @PathVariable Long orderId,
                                                           @RequestParam OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

}
