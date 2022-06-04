import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileDbSchema, ProfileDocument, ProfileSchema } from "./mongo/profile.schema";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ProfileDbSchema.name,
            schema: ProfileSchema
        }])
    ],
    providers: [
        ProfileResolver,
        ProfileService
    ],
})
export class ProfileModule {}
