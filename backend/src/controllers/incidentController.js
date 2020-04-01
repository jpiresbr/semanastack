const connection = require('../data/connection');

module.exports = {

    async index (request, response) {
        const  [count] = await connection("incidents").count();
        response.header("X-Total-Count", count['count(*)']);

        const { page = 1 } = request.query;

        const incidents = await connection("incidents")
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(4)
            .offset((page-1)*4)
            .select(["incidents.*", 'ongs.email', 'ongs.nome', 'ongs.whatsapp', 'ongs.cidade', 'ongs.uf']);
        return response.json(incidents);
    },

    async create (request, response){
        const {titulo, desc, valor} = request.body;
        const ong_id = request.headers.authorization;

        console.log(request.headers);

        const [id] = await connection('incidents').insert({
            titulo,
            desc,
            valor,
            ong_id
        });

        return response.json({ id });
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection("incidents")
            .where('id', id)
            .select('ong_id')
            .first();

        if(incidents.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted!'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

};