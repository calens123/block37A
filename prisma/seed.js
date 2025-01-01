const prisma = require("../node_modules/@prisma/client").PrismaClient;

const seed = async () => {
  const prismaClient = new prisma();

  try {
    // Seed Users
    const users = await prismaClient.user.createMany({
      data: [
        {
          username: "Alice",
          email: "alice@example.com",
          passwordHash: "hashedpassword1",
        },
        {
          username: "Bob",
          email: "bob@example.com",
          passwordHash: "hashedpassword2",
        },
        {
          username: "Charlie",
          email: "charlie@example.com",
          passwordHash: "hashedpassword3",
        },
      ],
    });

    console.log("Users seeded:", users.count);

    // Seed Items
    const items = await prismaClient.item.createMany({
      data: [
        {
          name: "Book A",
          description: "A great book about programming.",
          averageScore: 4.5,
        },
        {
          name: "Book B",
          description: "A novel set in the 1800s.",
          averageScore: 3.8,
        },
        {
          name: "Book C",
          description: "A beginner's guide to cooking.",
          averageScore: 4.2,
        },
      ],
    });

    console.log("Items seeded:", items.count);

    // Seed Reviews
    const reviews = await prismaClient.review.createMany({
      data: [
        { text: "Loved this book!", score: 5, itemId: 1, userId: 1 },
        { text: "It was okay.", score: 3, itemId: 2, userId: 2 },
        { text: "Highly recommended.", score: 4, itemId: 3, userId: 3 },
      ],
    });

    // Seed Comments
    const comments = await prismaClient.comment.createMany({
      data: [
        { text: "I agree with this review!", reviewId: 1, userId: 2 },
        { text: "Disagree, thought it was better.", reviewId: 2, userId: 3 },
        { text: "Thanks for the recommendation.", reviewId: 3, userId: 1 },
      ],
    });

    console.log("Comments seeded:", comments.count);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};

seed();
