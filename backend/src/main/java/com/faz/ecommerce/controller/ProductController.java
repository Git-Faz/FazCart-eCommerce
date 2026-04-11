package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.ProductRequest;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "15") int size,
        @RequestParam(defaultValue = "price") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {
        return ResponseEntity.ok(
            productService.getProducts(category, page, size, sortBy, direction)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> getProductByName(
        @RequestParam String name,
        @RequestParam int page,
        @RequestParam int size
    ) {
        return ResponseEntity.ok(
            productService.getProductsByName(name, page, size)
        );
    }

    @PostMapping("/new-product")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<Product> addSingleProduct(
        @Valid @RequestBody ProductRequest request
    ) {
        Product product = productService.addSingleProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @PatchMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @Valid @RequestBody ProductRequest request
    ) {
        Product updatedProduct = productService.updateProduct(id, request);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}
