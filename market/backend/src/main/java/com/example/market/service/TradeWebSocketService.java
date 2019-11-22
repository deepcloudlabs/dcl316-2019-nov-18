package com.example.market.service;

import com.example.market.domain.Trade;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TradeWebSocketService {
    private SimpMessagingTemplate messagingTemplate;

    public TradeWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void listen(Trade trade){
        messagingTemplate.convertAndSend("/topic/changes",trade);
    }
}
