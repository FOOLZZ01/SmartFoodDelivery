package com.smartdelivery.order.service;

import com.smartdelivery.order.model.Order;
import com.smartdelivery.order.repository.OrderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderListener {

    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @JmsListener(destination = "order-queue")
    public void listen(Message message) {
        try {
            if (message instanceof TextMessage textMessage) {
                String json = textMessage.getText();
                Order order = objectMapper.readValue(json, Order.class);

                order.setStatus("CONFIRMED");
                orderRepository.save(order).subscribe();

                System.out.println("✅ Naročilo sprejeto iz vrste: " + order);
            }
        } catch (Exception e) {
            System.err.println("❌ Napaka pri sprejemanju naročila iz vrste: " + e.getMessage());
        }
    }
}
