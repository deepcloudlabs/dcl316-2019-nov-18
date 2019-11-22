package com.example.market.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;

import javax.annotation.PostConstruct;

@Service
public class BinanceWebSocketMarketService implements WebSocketHandler {
    @Value("${binance.ws.url}")
    private String url;
    private WebSocketClient webSocketClient;

    public BinanceWebSocketMarketService(WebSocketClient webSocketClient) {
        this.webSocketClient = webSocketClient;
    }

    @PostConstruct
    public void init(){
         webSocketClient.doHandshake(this,url);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
        System.out.println("Connected to Binance!");
    }

    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        String trade = (String) webSocketMessage.getPayload();
        System.out.println(trade);
    }

    @Override
    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
