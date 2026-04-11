package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Product findProductByName(String name);
    Product findProductById(Long id);

    Page<Product> findByNameContainingIgnoreCase(
        String keyword,
        Pageable pageable
    );

    @Query(
        """
            SELECT p FROM Product p JOIN p.categories c
            WHERE LOWER(c) = LOWER(:category)
        """
    )
    Page<Product> findByCategory( @Param("category") String category, Pageable pageable);

    boolean existsProductById(Long id);
    boolean existsByNameIgnoreCase(String name);
    boolean existsProductByIdAndNameIgnoreCase(Long id, String name);

    Product deleteProductById(Long id);
}
