//Main Middelware For Pagination

function paginatedResult(model,sortFlage=false,options={id:1}) { 
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
    
      const startIndex = (page - 1) * limit;
    
      try {
        let results;
        let obj = options
        if(sortFlage)
        {
            results = await model.find().limit(limit).skip(startIndex).sort(obj).exec();
        }
        else
        {
            results = await model.find().limit(limit).skip(startIndex).exec();
        }
        // get total documents in the collection
        const count = await model.countDocuments();
        res.json({
          results,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } catch (err) {
        res.json({message:err.message});
      }
    }
  }
module.exports = paginatedResult