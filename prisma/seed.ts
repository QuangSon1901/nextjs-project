import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

async function main() {
    // let brandArr = [];
    // for (let i = 0; i < 10; i++) {
    //     let brand = await prisma.brand.create({
    //         data: {
    //             name: faker.company.name(),
    //         },
    //     });
    //     brandArr.push(brand.id);
    // }
    // let cateArr = [];
    // for (let i = 0; i < 10; i++) {
    //     let category = await prisma.category.create({
    //         data: {
    //             name: faker.company.name(),
    //         },
    //     });
    //     cateArr.push(category.id);
    // }
    // for (let i = 0; i < 100; i++) {
    //     await prisma.product.create({
    //         data: {
    //             title: faker.commerce.productName(),
    //             description: faker.commerce.productDescription(),
    //             price: faker.commerce.price(100, 1000),
    //             categoryID: faker.helpers.arrayElement(cateArr),
    //             brandID: faker.helpers.arrayElement(brandArr),
    //         },
    //     });
    // }
    // for (let i = 0; i < 10; i++) {
    //     await prisma.user.create({
    //         data: {
    //             name: faker.name.fullName(),
    //             email: faker.internet.email(),
    //             password: bcrypt.hashSync(faker.internet.password(), 10),
    //         },
    //     });
    // }
    // await prisma.user.create({
    //     data: {
    //         name: 'Admin',
    //         email: 'admin@gmail.com',
    //         password: bcrypt.hashSync('111111', 10),
    //     },
    // });
    // await prisma.user.create({
    //     data: {
    //         name: 'Manager',
    //         email: 'manager@gmail.com',
    //         password: bcrypt.hashSync('111111', 10),
    //     },
    // });
    // await prisma.user.create({
    //     data: {
    //         name: 'Customer',
    //         email: 'customer@gmail.com',
    //         password: bcrypt.hashSync('111111', 10),
    //     },
    // });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
