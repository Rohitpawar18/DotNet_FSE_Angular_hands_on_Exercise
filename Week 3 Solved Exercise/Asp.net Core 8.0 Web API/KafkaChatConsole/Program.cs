using Confluent.Kafka;

Console.Write("Enter your username: ");
string username = Console.ReadLine() ?? "Anonymous";

string bootstrapServers = "localhost:9092";
string topic = "chat-messages";

var producerConfig = new ProducerConfig { BootstrapServers = bootstrapServers };
var consumerConfig = new ConsumerConfig
{
    BootstrapServers = bootstrapServers,
    GroupId = $"chat-group-{Guid.NewGuid()}", // unique group so every instance sees all messages
    AutoOffsetReset = AutoOffsetReset.Latest
};

using var producer = new ProducerBuilder<Null, string>(producerConfig).Build();
using var consumer = new ConsumerBuilder<Ignore, string>(consumerConfig).Build();

consumer.Subscribe(topic);

// Background task: continuously listen for incoming messages
var consumeTask = Task.Run(() =>
{
    while (true)
    {
        try
        {
            var result = consumer.Consume();
            Console.WriteLine($"\n{result.Message.Value}");
            Console.Write("You: ");
        }
        catch (OperationCanceledException)
        {
            break;
        }
    }
});

Console.WriteLine($"Connected as '{username}'. Type a message and press Enter (type 'exit' to quit):\n");

// Main loop: read input and send messages
while (true)
{
    Console.Write("You: ");
    string? message = Console.ReadLine();

    if (string.IsNullOrWhiteSpace(message))
        continue;

    if (message.Trim().ToLower() == "exit")
        break;

    string formattedMessage = $"[{username}]: {message}";
    await producer.ProduceAsync(topic, new Message<Null, string> { Value = formattedMessage });
}

consumer.Close();