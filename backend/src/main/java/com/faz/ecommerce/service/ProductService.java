package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.ProductRequest;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.exception.BadRequestException;
import com.faz.ecommerce.exception.ResourceNotFoundException;
import com.faz.ecommerce.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;

    public Page<Product> getProducts(
            String category,
            Long minPrice,
            Long maxPrice,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        if (category != null) {
            category = category.trim().toLowerCase();
        }

        return productRepo.filterProducts(
                category,
                minPrice,
                maxPrice,
                pageable
        );
    }

    // optional (keep for now, merge later)
    public Page<Product> getProductsByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepo.findByNameContainingIgnoreCase(name, pageable);
    }

    public Product addSingleProduct(ProductRequest request) {

        if (productRepo.existsByNameIgnoreCase(request.getName())) {
            throw new BadRequestException("Product already exists");
        }

        Product product = new Product();

        product.setName(request.getName().trim());

        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription().trim());

        // normalize categories
        Set<String> normalizedCategories = request.getCategories()
                .stream()
                .map(c -> c.trim().toLowerCase())
                .collect(Collectors.toSet());

        product.setCategories(normalizedCategories);

        product.setImageUrl(request.getImageUrl());

        return productRepo.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item Not found"));

        if (request.getName() != null) p.setName(request.getName());
        if (request.getDescription() != null) p.setDescription(request.getDescription());
        if (request.getPrice() != null) p.setPrice(request.getPrice());
        if (request.getImageUrl() != null) p.setImageUrl(request.getImageUrl());

        return productRepo.save(p);
    }

    public void deleteProduct(Long id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        productRepo.delete(p);
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product doesn't exist"));
    }
}
