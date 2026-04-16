package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(
        String keyword,
        Pageable pageable
    );

    @Query(
        """
        SELECT p FROM Product p
        JOIN p.categories c
        WHERE (:category IS NULL OR LOWER(c) = LOWER(:category))
        AND (:min IS NULL OR p.price >= :min)
        AND (:max IS NULL OR p.price <= :max)
        """
    )
    Page<Product> filterProducts(
        @Param("category") String category,
        @Param("min") Long min,
        @Param("max") Long max,
        Pageable pageable
    );

    boolean existsByNameIgnoreCase(String name);
    
    @Query("""
        SELECT p FROM Product p WHERE p.stock != 0
        """)
    boolean isInStock(String name);
}
