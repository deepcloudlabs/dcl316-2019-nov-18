package com.example.market.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trades")
public class Trade {
    @Id
    private String id;
    @JsonProperty("s")
    private String symbol;
    @JsonProperty("p")
    private String price;
    @JsonProperty("q")
    private String quantity;
    @JsonProperty("T")
    private String timestamp;
    @JsonProperty("t")
    private long sequence;

    public Trade() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public long getSequence() {
        return sequence;
    }

    public void setSequence(long sequence) {
        this.sequence = sequence;
    }

    @Override
    public String toString() {
        return "Trade{" +
                "id='" + id + '\'' +
                ", symbol='" + symbol + '\'' +
                ", price='" + price + '\'' +
                ", quantity='" + quantity + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", sequence=" + sequence +
                '}';
    }
}
