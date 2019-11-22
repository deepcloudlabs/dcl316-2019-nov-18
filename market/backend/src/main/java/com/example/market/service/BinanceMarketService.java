package com.example.market.service;

import com.example.market.domain.Ticker;
import com.example.market.repository.TickerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
public class BinanceMarketService {

    @Value("${binance.rest.url}")
    private String binanceRestUrl;

    private TickerRepository tickerRepository;

    public BinanceMarketService(TickerRepository tickerRepository) {
        this.tickerRepository = tickerRepository;
    }

    @Scheduled(fixedRate = 1_000)
    public void callBinanceRestApi(){
        RestTemplate rt = new RestTemplate();
        Ticker ticker = rt.getForEntity(binanceRestUrl,Ticker.class)
                          .getBody();
        tickerRepository.save(ticker);
        System.out.println(ticker);
    }

    @Scheduled(fixedRate = 1_000)
    public void callBinanceRestApiEmulation(){
        double price = 7500 + ( Math.random() - 0.5 ) * 10 ;
        Ticker ticker = new Ticker("BTCUSDT",Double.toString(price));
        // tickerRepository.save(ticker);
        System.out.println(ticker);
    }
}
