const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/data/connection');

describe('ong', () =>{

    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shuld be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            nome:"MAFUG",
            email:"contato@tes.com",
            whatsapp:"62981152525",
            cidade:"Aparecida de Goiânia",
            uf:"GO"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});