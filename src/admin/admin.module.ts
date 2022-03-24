import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { AdminModule as AdminBroModule } from '@adminjs/nestjs';
import { PostModule } from 'src/post/post.module';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from 'src/post/post.schema';
import { Model } from 'mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.schema';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
    imports: [
        AdminBroModule.createAdminAsync({
        imports: [PostModule, AuthModule],
        inject: [
          getModelToken(Post.name),
          getModelToken(User.name)
        ],
        useFactory: (postModel: Model<Post>, userModel: Model<User>) => ({
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: postModel,
                  //옵션 - richtext(블로그처럼 contents쓰기)
                  options: {
                    properties: {
                      contents: { type: 'richtext' },
                    },
                  },                
                },
                {
                  resource: userModel
                },
              ],
              //admin메인화면
              dashboard: {
                component: AdminJS.bundle('./dashboard'),
              },
              //title
              branding: {
                companyName: 'CGF-Project',
                logo: false,
              },
            },
            //admin계정 todo.env
            auth: {
              authenticate: async (email, password) => Promise.resolve({ email: 'hob4410@gmail.com' }),
              cookieName: 'admin',
              cookiePassword: 'admin123',
            },
          }),
        }),
      ],
    })
export class AdminModule {}
