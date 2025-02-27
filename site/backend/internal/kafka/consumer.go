package kafka

import (
	"context"
	"github.com/segmentio/kafka-go"
	"log"
)

func StartKafkaConsumer(brokers []string, topic, groupID string, handleMessage func(key, value []byte)) {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: brokers,
		Topic:   topic,
		GroupID: groupID,
	})

	log.Printf("Kafka Consumer started for topic: %s", topic)

	go func() {
		for {
			msg, err := reader.ReadMessage(context.Background())
			if err != nil {
				log.Printf("Error reading message from Kafka: %v", err)
				continue
			}

			log.Printf("Message received: key=%s, value=%s", string(msg.Key), string(msg.Value))
			handleMessage(msg.Key, msg.Value)
		}
	}()
}
