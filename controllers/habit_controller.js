const Habit = require('../models/Habit');

module.exports.load = async function (request, response) {
    try {
     const habits = await Habit.find({})
     if ( habits) {
        return response.render('home', { habit_list: habits });
    //     if (err) {
    //         console.log("Error in fetching habits from DB");
    //         return;
    //     }
    //     else {
    //         return response.render('home', { habit_list: habits });
    //     }
    }
}catch(error){
    console.log("error", error)
}
}

// This function helps in adding a habit in list.
module.exports.add =  async function (request, response) {
    request.body.record_tracker = {};
    request.body.user = "AnyUser";
    console.log(request.body);
   await Habit.create(request.body)
    return response.redirect("back");
    // function (err, newhabit) {
    //     if (err) {
    //         console.log("error in creating a habit");
    //         return;
    //     }
    //     else {
    //         // console.log("******New habit******")
    //         // console.log(newhabit);
    //         return response.redirect("back");
    //     }
    // }
}

// This function helps in deleting a habit from list.
module.exports.delete = async function (request, response) {
    let id = request.query.id;
    await Habit.findByIdAndDelete(id)
     return response.redirect('back');
    // function (err) {
    //     if (err) {
    //         console.log("error in deletion");
    //         return;
    //     }
    //     else {
    //         return response.redirect('back');
    //     }
    // }
}

// Finds a habit by id given in query params and renders it
module.exports.viewhabit = async function (request, response) {
    let id = request.query.id;
  const habit = await  Habit.findById(id)
  if(habit){
    response.render("habit.ejs", { "habit": habit });
}
    // function (err, habit) {
    //     if (err) {
    //         console.log("error in finding habit");
    //         return;
    //     }
    //     else {
    //         response.render("habit.ejs", { "habit": habit });
    //     }
    // }
}

// Finds a habit by id given in query params and returns it's json object
module.exports.fetchhabit = async function (request, response) {
    let id = request.query.id;
  const habit = await  Habit.findById(id)
  if(habit){
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(habit));
}
    // function (err, habit) {
    //     if (err) {
    //         console.log("error in finding habit");
    //         return;
    //     }
    //     else {
    //         response.setHeader('Content-Type', 'application/json');
    //         response.end(JSON.stringify(habit));
    //     }
    // }
}

// first find an element in database using id
module.exports.updateDates = async function (request, response) {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    console.log(date, value, id);

    //  Then add/update the date in map then finally update map
    const habit = await Habit.findById(id);
    
        if (habit) {
            console.log("Error in updating habit!!!!");
            return response.end('{ "status":"failed"}');
        }
        else {
            const r_t = habit.record_tracker;
            if (date in r_t) {
                r_t[date] = value;
            }
            else {
                r_t.set(date, value);
            }
            console.log(r_t);
            Habit.updateOne({ "_id": id }, { $set: { record_tracker: r_t } }, function (err) {
                if (err) {
                    console.log("Error in updating habit!!!!");
                    return response.end('{ "status":"failed"}');
                }
                else {
                    // console.log("Updated!");
                    return response.end('{ "status":"success"}');
                }
            });
        
    }


}