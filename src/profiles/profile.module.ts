import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "./mongo/profile.schema";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Profile',
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
