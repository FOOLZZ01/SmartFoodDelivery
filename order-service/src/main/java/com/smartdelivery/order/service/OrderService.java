package com.smartdelivery.order.service;

import com.smartdelivery.order.model.Order;
import com.smartdelivery.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Mono<Order> createOrder(Order order) {
        order.setStatus("CREATED");
        log.info("🆕 Ustvarjanje naročila za uporabnika {} z restavracijo {}", order.getUserId(), order.getRestaurantId());
        return orderRepository.save(order)
                .doOnSuccess(saved -> log.info("✅ Naročilo shranjeno: {}", saved));
    }

    public Flux<Order> getAllOrders() {
        log.info("📦 Pridobivanje vseh naročil");
        return orderRepository.findAll();
    }

    public Mono<Order> getOrderById(String id) {
        log.info("🔍 Iskanje naročila po ID: {}", id);
        return orderRepository.findById(id)
                .doOnSuccess(order -> {
                    if (order != null)
                        log.info("✅ Naročilo najdeno: {}", order);
                    else
                        log.warn("⚠️ Naročilo z ID {} ni bilo najdeno", id);
                });
    }

    public Mono<Void> deleteOrder(String id) {
        log.info("🗑️ Brisanje naročila z ID: {}", id);
        return orderRepository.deleteById(id)
                .doOnSuccess(v -> log.info("✅ Naročilo z ID {} izbrisano", id));
    }

    public Mono<Order> updateOrderStatus(String id, String status) {
        log.info("✏️ Posodabljanje statusa naročila z ID {} na '{}'", id, status);
        return orderRepository.findById(id)
                .flatMap(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                })
                .doOnSuccess(updated -> {
                    if (updated != null)
                        log.info("✅ Status naročila posodobljen: {}", updated);
                    else
                        log.warn("⚠️ Naročilo za posodobitev ni bilo najdeno");
                });
    }
}
