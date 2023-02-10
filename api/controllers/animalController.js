import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_animals = async (ctx, next) => {
    try {
        let animals = read_file("animals.json")
        ctx.body = animals;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_a_animal = async (ctx, next) => {
    try {
        let new_animal = ctx.request.body;
        let animals = read_file("animals.json");
        console.log(animals);

        animals.push({
            id: animals.length + 1,
            ...new_animal
        })
        write_file("animals.json", animals )
        ctx.body = new_animal;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_a_animals = async (ctx, next) => {
    try {
        let animal =read_file('animals.json').find(s => s.id == ctx.params.animalId);
        if(!animal){
          return ctx.body = { msg: "Animal not found!" }
        }
        ctx.body = animal;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_a_animal = async (ctx, next) => {
    try {
        let { name, surname, scholarship } = ctx.request.body;
        let animals = read_file("animals.json");
        let topilgan_animal = animals.find(s => s.id == ctx.params.animaltId )

        if(!topilgan_animal){
            return ctx.body = { msg: "Animal not found!" }
        }

        students.forEach((s, idx) => {
            if(s.id == topilgan_animal.id){
                s.name = name ? name : s.name
                s.surname = surname ? surname : s.surname
                s.scholarship = scholarship ? scholarship : s.scholarship
            }
        })

        write_file("animals.json", animals)
        ctx.body = { msg: "Animal updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_a_animal = async (ctx, next) => {
    try {
        let animals = read_file("students.json");
        let topilgan_animal = animals.find(s => s.id == ctx.params.animalId )

        if(!topilgan_animal){
            return ctx.body = { msg: "Animal not found!" }
        } 
        animals.forEach((s, idx) => {
            if(s.id == topilgan_animal.id){
               animals.splice(idx, 1)
            }
        })
        write_file("animals.json", animals);
        console.log(await next());

        ctx.body = { msg: "Animal deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_animals,
    create_a_animal,
    read_a_animals,
    update_a_animal,
    delete_a_animal
}