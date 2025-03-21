import Permission from "@/app/models/Permission.model";
import { Notification_PERMISSION_CODE } from "./v1/auth/Notification.routes";
import { Permission_PERMISSION_CODE } from "./v1/auth/Permission.routes";
import { Role_PERMISSION_CODE } from "./v1/auth/Role.routes";
import { TransactionHistory_PERMISSION_CODE } from "./v1/auth/TransactionHistory.routes";
import { Author_PERMISSION_CODE } from "./v1/story/Author.routes";
import { Category_PERMISSION_CODE } from "./v1/story/Category.routes";
import { Chapter_PERMISSION_CODE } from "./v1/story/Chapter.routes";
import { Comment_PERMISSION_CODE } from "./v1/story/Comment.routes";
import { FollowStory_PERMISSION_CODE } from "./v1/story/FollowStory.routes";
import { LikeStory_PERMISSION_CODE } from "./v1/story/LikeStory.routes";
import { Purchase_PERMISSION_CODE } from "./v1/story/Purchase.routes";
import { Story_PERMISSION_CODE } from "./v1/story/Story.routes";
import { User_PERMISSION_CODE } from "./v1/story/User.routes";
import { Upload_PERMISSION_CODE } from "./v1/util/Upload.routes";
import { Op } from "sequelize";
import Role from "@/app/models/Role.model";



const listPermissions = {
    Notification_PERMISSION_CODE,
    Permission_PERMISSION_CODE,
    Role_PERMISSION_CODE,
    TransactionHistory_PERMISSION_CODE,
    Author_PERMISSION_CODE,
    Category_PERMISSION_CODE,
    Chapter_PERMISSION_CODE,
    Comment_PERMISSION_CODE,
    FollowStory_PERMISSION_CODE,
    LikeStory_PERMISSION_CODE,
    Purchase_PERMISSION_CODE,
    Story_PERMISSION_CODE,
    User_PERMISSION_CODE,
    Upload_PERMISSION_CODE,
}

function getPermissions(obj, data) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                getPermissions(value, data); // Đệ quy vào object con
            } else {
                data.push(value)
            }
        }
    }
}

const initPermissions = async () => {
    const requiredPermissions = []
    getPermissions(listPermissions, requiredPermissions)

    const existingPermissions = await Permission.findAll({
        where: {
            code: {
                [Op.in]: requiredPermissions
            }
        },
    });

    // Lọc ra các quyền chưa tồn tại trong database
    const existingPermissionCodes = existingPermissions.map((p) => p.code);
    const missingPermissions = requiredPermissions.filter(
        (code) => !existingPermissionCodes.includes(code),
    );

    const permissionInserts = missingPermissions.map((perCode) => {
        const [name, handle] = perCode.split('.');
        return {
            name: `${handle} ${name}`,
            code: perCode,
            description: `thực hiện ${handle} cho ${name}`
        };
    });

    const permissionInserted =
        await Permission.bulkCreate(permissionInserts);
    console.log(permissionInserted);

    return requiredPermissions
}

const initRoles = async (permissions) => {
    const permissionsJson = JSON.stringify(permissions)
    const data = [
        {
            name: 'Người dùng thường',
            description: 'Người dùng chính của trang web',
            code: 'user.231',
            permissions: permissionsJson
        },
        {
            name: 'Quản trị viên',
            description: 'Quản lý các bài viết trong trang',
            code: 'admin.141',
            permissions: permissionsJson
        }
    ]

    const checkExistRole = await Role.findAll()
    if (checkExistRole) {
        return;
    }

    try {
        const roleInserted =
            await Role.bulkCreate(data);
        console.log(roleInserted);

    } catch (error) {
        console.error(error);
    }
}

export const initDataCore = async () => {
    const permissions = await initPermissions()
    initRoles(permissions)
}