package com.faz.ecommerce;

import com.faz.ecommerce.dto.AuthResponse;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.service.AuthService;
import com.faz.ecommerce.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class EcommerceApplicationIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private ProductService productService;

    @Test
    void applicationContextStartsWithTestDatabase() {
        // Loading this test class verifies the complete Spring application context.
    }

    @Test
    void publicRegisterEndpointWorksThroughFullApplicationStack() throws Exception {
        given(authService.register(any()))
                .willReturn(AuthResponse.builder()
                        .token("integration-token")
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
                .andExpect(jsonPath("$.token").value("integration-token"))
                .andExpect(jsonPath("$.username").value("jane"));
    }

    @Test
    void publicProductEndpointWorksThroughSecurityAndMvc() throws Exception {
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
                .andExpect(jsonPath("$.content[0].name").value("Coffee"));
    }

    @Test
    void protectedCartEndpointRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/cart"))
                .andExpect(status().isForbidden());
    }
}
