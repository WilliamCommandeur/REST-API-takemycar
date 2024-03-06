const debug = require('debug')("api:error");
const { access, constants, appendFile } = require('node:fs/promises');
const path = require('path')
const APIError = require('./APIError');


const errorService = {

    manageError(err, req, res, next) {
        
        debug(err);
        
        errorService.logError(err,req.url);
        res.status(err.code).json(err.message);
    },
    
    async logError(err,url) {
        const logPath = "../../../log/";
        const date = new Date();
        const fileName = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.log`;
        let fileExist = false;
        
        const filePath = path.join(__dirname, logPath + fileName);
        
        try {
            await access(filePath, constants.R_OK);
            fileExist = true;
        } catch(err) {
            debug(err);
        }
        
        if (!fileExist) {
            const content = "Heure;Url;Message;StackTrace;\n";
            await appendFile(filePath,content);
        }
        
        const errorContent = `${new Date().toTimeString()};${url};${err.message};${err.stack}\n`;
        await appendFile(filePath, errorContent);
    },
    
    _404(req,res,next) {
        next(new APIError("URL non trouvée", 404));
    }
}
    
module.exports = errorService;