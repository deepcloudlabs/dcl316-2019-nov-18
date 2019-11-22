package com.example.market.service;

import com.example.market.domain.Ticker;
import com.example.market.domain.Trade;
import com.example.market.repository.TickerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@ConditionalOnProperty(name = "emulation.mode", havingValue = "true")
public class BinanceMarketEmulationService {

    @Value("${binance.rest.url}")
    private String binanceRestUrl;

    private TickerRepository tickerRepository;
    private ApplicationEventPublisher publisher;

    public BinanceMarketEmulationService(TickerRepository tickerRepository, ApplicationEventPublisher publisher) {
        this.tickerRepository = tickerRepository;
        this.publisher = publisher;
    }

    @PostConstruct
    public void init() {
        System.out.println("BinanceMarketEmulationService is active.");
    }

    @Scheduled(fixedRate = 1_000)
    public void callBinanceRestApiEmulation() {
        double price = 7500 + (Math.random() - 0.5) * 10;
        double quantity = Math.random() * 2;
        Ticker ticker = new Ticker("BTCUSDT", Double.toString(price));
        tickerRepository.save(ticker);
        Trade trade = new Trade();
        trade.setSymbol("btcusdt");
        trade.setPrice(ticker.getPrice());
        trade.setQuantity(Double.toString(quantity));
        trade.setTimestamp("1");
        trade.setSequence(1);
        publisher.publishEvent(trade);
    }
}
