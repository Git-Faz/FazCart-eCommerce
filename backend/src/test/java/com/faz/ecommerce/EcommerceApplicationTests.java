package com.faz.ecommerce;

import com.faz.ecommerce.controller.AuthController;
import com.faz.ecommerce.controller.CartController;
import com.faz.ecommerce.controller.ProductController;
import com.faz.ecommerce.dto.AuthResponse;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.exception.ResourceNotFoundException;
import com.faz.ecommerce.security.JwtAuthenticationFilter;
import com.faz.ecommerce.security.JwtUtil;
import com.faz.ecommerce.service.AuthService;
import com.faz.ecommerce.service.CartService;
import com.faz.ecommerce.service.CustomUserDetailsService;
import com.faz.ecommerce.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        AuthController.class,
        ProductController.class,
        CartController.class
})
@AutoConfigureMockMvc(addFilters = false)
class EcommerceApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private ProductService productService;

    @MockBean
    private CartService cartService;

    // These mocks keep the web slice independent from the application's JWT filter.
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void contextLoads() {
    }

    @Test
    void registerReturnsCreatedResponse() throws Exception {
        given(authService.register(ArgumentMatchers.any()))
                .willReturn(AuthResponse.builder()
                        .token("test-token")
                        .username("jane")
                        .role("USER")
                        .build());

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "jane",
                                  "email": "jane@example.com",
                                  "password": "password123"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("test-token"))
                .andExpect(jsonPath("$.username").value("jane"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void registerRejectsInvalidRequest() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "",
                                  "email": "not-an-email",
                                  "password": "short"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));

        verifyNoInteractions(authService);
    }

    @Test
    void loginReturnsOkResponse() throws Exception {
        given(authService.login(ArgumentMatchers.any()))
                .willReturn(AuthResponse.builder()
                        .token("login-token")
                        .username("jane")
                        .email("jane@example.com")
                        .role("USER")
                        .build());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "jane",
                                  "password": "password123"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("login-token"))
                .andExpect(jsonPath("$.email").value("jane@example.com"));
    }

    @Test
    void getProductsReturnsPageOfProducts() throws Exception {
        Product product = new Product();
        product.setId(1L);
        product.setName("Coffee");
        product.setPrice(10L);
        product.setDescription("Ground coffee");
        product.setStock(5);

        given(productService.getProducts(
                null, null, null, 0, 15, "price", "asc"))
                .willReturn(new PageImpl<>(List.of(product)));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Coffee"))
                .andExpect(jsonPath("$.content[0].price").value(10));
    }

    @Test
    void getProductByIdReturnsNotFoundForMissingProduct() throws Exception {
        given(productService.getProductById(99L))
                .willThrow(new ResourceNotFoundException("Product doesn't exist"));

        mockMvc.perform(get("/api/products/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Product doesn't exist"));
    }

    @Test
    void clearCartReturnsNoContent() throws Exception {
        mockMvc.perform(delete("/api/cart"))
                .andExpect(status().isNoContent());

        verify(cartService).clearCart();
    }

}
