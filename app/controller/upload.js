'use strict';

const Controller = require('../core/base_controller');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const OSS = require('ali-oss'); 
const fsToll = require('fs-extra');
const dayjs = require('dayjs');

let client = new OSS({
  region: 'oss-cn-beijing',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: 'LTAIt9oCtq8ih0Hj',
  accessKeySecret: 'UdsJSWOh5js7HRdnAPRDv1hdV2lwTh',
  bucket: 'wpw-egg-react'
});

class UploadController extends Controller {
  //单个文件上传
  async create(){
    const { ctx, service } = this;
    const dirName = dayjs(Date.now()).format('YYYYMMDD');//生成日期数据

    await fsToll.ensureDir(path.join(this.config.baseDir,'app/public/uploads/avatar/' + dirName)); //生成文件夹 ，如果存在则不生成
    //获取用户上传文件

    const stream = await ctx.getFileStream();
    const extname = path.extname(stream.filename).toLowerCase(); //文件扩展名称
    const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + extname; //文件名
    const target = path.join(this.config.baseDir, 'app/public/uploads/avatar', dirName, fileName); //文件存放目录位置
    const writeStream = fs.createWriteStream(target); //存储文件 创造可写流
    const streamPipe = stream.pipe(writeStream); //文件存储等待机制 将可读性流写入可写流

    try{
      const r1 = await client.put(fileName, target); //阿里云图片上传
      const avatarUrl = r1.url; //返回阿里云图片url
      await ctx.service.user.updateAvatar({ avatarUrl });
    }catch(e){
    //销费文件流 
      await sendToWormhole(stream);
      throw e;
    }};
}

module.exports = UploadController;
