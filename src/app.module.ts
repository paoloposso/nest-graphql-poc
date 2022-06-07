import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './authors/authors.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ProfileModule } from './profiles/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileRepository } from './profiles/profile.repository';

@Module({
  imports: [
    AuthorsModule,
    ProfileModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  providers: [
  ]
})
export class AppModule {}