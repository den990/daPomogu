package kafka

import (
	"github.com/segmentio/kafka-go"
	"log"
)

var kafkaWriter *kafka.Writer

// InitKafkaProducer инициализирует Kafka Producer
func InitKafkaProducer(brokers []string, topic string) {
	kafkaWriter = &kafka.Writer{
		Addr:     kafka.TCP(brokers...),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}

	log.Printf("Kafka Producer initialized for topic: %s", topic)
}

// PublishMessage отправляет сообщение в Kafka
func PublishMessage(key, message string) error {
	err := kafkaWriter.WriteMessages(nil, kafka.Message{
		Key:   []byte(key),
		Value: []byte(message),
	})
	if err != nil {
		log.Printf("Failed to publish message to Kafka: %v", err)
		return err
	}

	log.Printf("Message published to Kafka: key=%s, value=%s", key, message)
	return nil
}

// CloseKafkaProducer закрывает Kafka Producer
func CloseKafkaProducer() {
	if kafkaWriter != nil {
		kafkaWriter.Close()
	}
}
