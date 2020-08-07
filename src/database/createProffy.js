module.exports = async function(db, { proffyValue, classValue, classScheduleValues}){
//await irá segurar a aplicação na linha até que seja completada a operação... Exclui a usabilidade do then() -> db.run().then()
//O await não funcionará se não houver async na frente da função

    //Inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID
    //O insertedProffy serve para armazanar o id do professor que será criado pelo bd

    //Inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject, 
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //Inserir dados na tabela class_schedule => => Precisará de uma estrutura de repetição, já que pode ser inseridos vários valores  => O map faz "O mesmo que o foreach mas vai criando um array com as informações que encontra"
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //Execução de todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}

