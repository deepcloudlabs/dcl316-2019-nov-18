package com.example.market.repository;

import com.example.market.domain.Trade;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TradeRepository extends MongoRepository<Trade,String> {
}
