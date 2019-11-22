package com.example.market.service;

import com.example.market.domain.Trade;
import com.example.market.repository.TradeRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class TradeMongoListener {
    private TradeRepository tradeRepository;

    public TradeMongoListener(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    @EventListener
    public void listen(Trade trade) {
        tradeRepository.save(trade);
    }
}
