package com.example.market.repository;

import com.example.market.domain.Ticker;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TickerRepository extends MongoRepository<Ticker,String> {
}
