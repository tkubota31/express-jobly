const { sqlForPartialUpdate } = require("./sql")
const {BadRequestError} = require("../expressError")
//Create fake user Data
const userData = {
    first_name: "Tai",
    last_name: "Kubo",
}

const jsToSqlUser = {
    firstName: "nothing",
    lastName:"boring"
}


describe("sqlForPartialUpdate", function(){
    test("update one item", function(){
    const updateTest = sqlForPartialUpdate(userData,jsToSqlUser);
    expect(updateTest).toEqual({
        setCols: '"first_name"=$1, "last_name"=$2',
        values: ["Tai", "Kubo"]
        });
    });
    test("check if error works", function(){
        try{
            const res = sqlForPartialUpdate({});
        } catch(err){
            expect(err instanceof BadRequestError)
        }
    })
})
