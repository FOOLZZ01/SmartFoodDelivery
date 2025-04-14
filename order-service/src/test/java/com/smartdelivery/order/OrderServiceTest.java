package com.smartdelivery.order;

import com.smartdelivery.order.model.Order;
import com.smartdelivery.order.repository.OrderRepository;
import com.smartdelivery.order.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

public class OrderServiceTest {

    private OrderRepository orderRepository;
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        orderRepository = Mockito.mock(OrderRepository.class);
        orderService = new OrderService(orderRepository);
    }

    @Test
    public void testCreateOrder() {
        Order order = new Order();
        order.setUserId("user123");
        order.setRestaurantId("resto123");
        order.setStatus("CREATED");
        order.setItems(new String[]{"Pizza", "Burger"});
        order.setCreatedAt("2025-04-14T16:30:00");

        Mockito.when(orderRepository.save(order)).thenReturn(Mono.just(order));

        Mono<Order> savedOrder = orderService.createOrder(order);

        StepVerifier.create(savedOrder)
                .expectNextMatches(o ->
                        o.getUserId().equals("user123") &&
                        o.getRestaurantId().equals("resto123") &&
                        o.getStatus().equals("CREATED") &&
                        o.getItems().length == 2)
                .verifyComplete();
    }
}
