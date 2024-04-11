const jobsCtrl ={}

jobsCtrl.list = async(req, res)=>{
    res.send('listing all jobs')
}

jobsCtrl.create = async(req,res)=>{
    res.send('create a job')
}

module.exports = jobsCtrl