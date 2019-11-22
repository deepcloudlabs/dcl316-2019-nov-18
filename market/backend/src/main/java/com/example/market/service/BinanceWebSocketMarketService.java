package com.example.market.service;

import com.example.market.domain.Trade;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;

import javax.annotation.PostConstruct;

@Service
@ConditionalOnProperty(name = "emulation.mode", havingValue = "false")
public class BinanceWebSocketMarketService implements WebSocketHandler {
    @Value("${binance.ws.url}")
    private String url;
    private WebSocketClient webSocketClient;
    private ObjectMapper objectMapper;
    private ApplicationEventPublisher publisher;

    public BinanceWebSocketMarketService(WebSocketClient webSocketClient, ObjectMapper objectMapper, ApplicationEventPublisher publisher) {
        this.webSocketClient = webSocketClient;
        this.objectMapper = objectMapper;
        this.publisher = publisher;
    }

    @PostConstruct
    public void init() {
        System.out.println("BinanceWebSocketMarketService is active.");
        webSocketClient.doHandshake(this, url);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
        System.out.println("Connected to Binance!");
    }

    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        String payload = (String) webSocketMessage.getPayload();
        Trade trade = objectMapper.readValue(payload, Trade.class);
        publisher.publishEvent(trade);
    }

    @Override
    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {
        System.err.println(webSocketSession.getId() + " issued a problem: " + throwable.getMessage());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
        System.err.println(webSocketSession.getId() + " closed the session.");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
