package com.faz.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartItemResponse {

    private Long id;
    private Long productId;
    private Long userId;
    private String productName;
    private Long productPrice;
    private String productImageUrl;
    private int quantity;
    private Long totalPrice;
}
