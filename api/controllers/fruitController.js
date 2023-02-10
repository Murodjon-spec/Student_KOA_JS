import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_fruits = async (ctx, next) => {
    try {
        let fruits = read_file("fruits.json")
        ctx.body = fruits;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_a_fruit = async (ctx, next) => {
    try {
        console.log("salom");
        let new_fruit = ctx.request.body;
        let fruits = read_file("fruits.json");
        console.log(fruits);

        fruits.push({
            id: fruits.length + 1,
            ...new_fruit
        })
        write_file("fruits.json", fruits )
        ctx.body = new_fruit;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_a_fruits = async (ctx, next) => {
    try {
        let fruit =read_file('fruits.json').find(s => s.id == ctx.params.fruitlId);
        if(!fruit){
          return ctx.body = { msg: "Fruit not found!" }
        }
        ctx.body = fruit;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_a_fruit = async (ctx, next) => {
    try {
        let { name, surname, scholarship } = ctx.request.body;
        let fruits = read_file("fruits.json");
        let topilgan_fruit = fruits.find(s => s.id == ctx.params.fruittId )

        if(!topilgan_fruit){
            return ctx.body = { msg: "Fruit not found!" }
        }

        fruits.forEach((s, idx) => {
            if(s.id == topilgan_fruit.id){
                s.name = name ? name : s.name
                s.surname = surname ? surname : s.surname
                s.scholarship = scholarship ? scholarship : s.scholarship
            }
        })

        write_file("fruits.json", fruits)
        ctx.body = { msg: "Fruit updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_a_fruit= async (ctx, next) => {
    try {
        let fruits= read_file("fruits.json");
        let topilgan_fruit = fruits.find(s => s.id == ctx.params.fruitlId )

        if(!fruits){
            return ctx.body = { msg: "fruit not found!" }
        } 
        fruits.forEach((s, idx) => {
            if(s.id == topilgan_fruit.id){
               fruits.splice(idx, 1)
            }
        })
        write_file("fruits.json", fruits);
        console.log(await next());

        ctx.body = { msg: "Fruit deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_fruits,
    create_a_fruit,
    read_a_fruits,
    update_a_fruit,
    delete_a_fruit
}