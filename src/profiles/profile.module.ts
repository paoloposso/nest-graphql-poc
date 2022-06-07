import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileDb, ProfileSchema } from "./mongo/profile.schema";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ProfileDb.name,
            schema: ProfileSchema
        }])
    ],
    providers: [
        ProfileRepository,
        ProfileResolver,
        ProfileService    
    ],
})
export class ProfileModule {}
