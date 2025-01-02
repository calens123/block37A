const prisma = require("./prisma");

const seed = async () => {
  try {
    // Seed Users
    const users = await prisma.user.createMany({
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
    const items = await prisma.item.createMany({
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
    const reviews = await prisma.review.createMany({
      data: [
        { text: "Loved this book!", score: 5, itemId: 1, userId: 1 },
        { text: "It was okay.", score: 3, itemId: 2, userId: 2 },
        { text: "Highly recommended.", score: 4, itemId: 3, userId: 3 },
      ],
    });

    console.log("Reviews seeded:", reviews.count);

    // Seed Comments
    const comments = await prisma.comment.createMany({
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
    await prisma.$disconnect();
  }
};

seed();
