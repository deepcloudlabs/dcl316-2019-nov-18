package com.example.market.service;

import com.example.market.domain.Ticker;
import com.example.market.repository.TickerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@Service
@ConditionalOnProperty(name = "emulation.mode", havingValue = "false")
public class BinanceMarketService {

    @Value("${binance.rest.url}")
    private String binanceRestUrl;

    private TickerRepository tickerRepository;
    private ApplicationEventPublisher publisher;

    public BinanceMarketService(TickerRepository tickerRepository, ApplicationEventPublisher publisher) {
        this.tickerRepository = tickerRepository;
        this.publisher = publisher;
    }

    @PostConstruct
    public void init() {
        System.out.println("BinanceMarketService is active.");
    }

    @Scheduled(fixedRate = 1_000)
    public void callBinanceRestApi() {
        RestTemplate rt = new RestTemplate();
        Ticker ticker = rt.getForEntity(binanceRestUrl, Ticker.class)
                .getBody();
        tickerRepository.save(ticker);
        System.out.println(ticker);
    }

}
