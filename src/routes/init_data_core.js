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
import Category from "@/app/models/Category.model";
import User from "@/app/models/User.model";
import UserGenderEnum from "@/app/enums/user/UserGender.enum";
import UserStatusEnum from "@/app/enums/user/UserStatus.enum";
import UserRoleEnum from "@/app/enums/user/UserRole.enum";
import BcryptConfig from "@/config/Bcrypt.config";
import Author from "@/app/models/Author.model";
import StoryAccessEnum from "@/app/enums/story/StoryAccess.enum";
import StoryTypeEnum from "@/app/enums/story/StoryType.enum";
import Story from "@/app/models/Story.model";
import CategoryStory from "@/app/models/CategoryStory.model";
import ChapterAccessEnum from "@/app/enums/chapter/ChapterAccess.enum";
import Chapter from "@/app/models/Chapter.model";



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
    if (checkExistRole.length > 0) {
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

const initCategories = async () => {
    const categories = [
        { name: "Khoa học viễn tưởng", slug: "khoa-hoc-vien-tuong" },
        { name: "Trinh thám", slug: "trinh-tham" },
        { name: "Lãng mạn", slug: "lang-man" },
        { name: "Hài hước", slug: "hai-huoc" },
        { name: "Hành động", slug: "hanh-dong" },
        { name: "Kinh dị", slug: "kinh-di" },
        { name: "Tiểu thuyết", slug: "tieu-thuyet" },
        { name: "Lịch sử", slug: "lich-su" },
        { name: "Phiêu lưu", slug: "phieu-luu" },
        { name: "Thần thoại", slug: "than-thoai" }
    ];

    const checkExistCategories = await Category.findAll()

    if (checkExistCategories.length > 0) {
        return;
    }

    try {
        const categoriesInserted =
            await Category.bulkCreate(categories);
        console.log(categoriesInserted);

    } catch (error) {
        console.error(error);
    }
}

const initUsers = async () => {
    const password = BcryptConfig.hashPass('123456')
    const users = [
        {
            firstName: "Alan",
            lastName: "Nguyễn",
            email: "alannguyen@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Bảo",
            lastName: "Trần",
            email: "baotran@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Cẩm",
            lastName: "Lê",
            email: "camle@gmail.com",
            password: password,
            gender: UserGenderEnum.FEMALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Dũng",
            lastName: "Phạm",
            email: "dungpham@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Evy",
            lastName: "Hoàng",
            email: "evyhoang@gmail.com",
            password: password,
            gender: UserGenderEnum.FEMALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Phong",
            lastName: "Ngô",
            email: "phongngo@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Giang",
            lastName: "Bùi",
            email: "giangbui@gmail.com",
            password: password,
            gender: UserGenderEnum.FEMALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Hoàng",
            lastName: "Lý",
            email: "hoangly@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Yến",
            lastName: "Võ",
            email: "yenvov@gmail.com",
            password: password,
            gender: UserGenderEnum.FEMALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        },
        {
            firstName: "Khang",
            lastName: "Đỗ",
            email: "khangdo@gmail.com",
            password: password,
            gender: UserGenderEnum.MALE,
            status: UserStatusEnum.CONFIRMED,
            roleCode: UserRoleEnum.USER,
        }
    ];

    const checkExistUsers = await User.findAll()

    if (checkExistUsers.length > 0) {
        return;
    }

    try {
        const usersInserted =
            await User.bulkCreate(users);
        console.log(usersInserted);

    } catch (error) {
        console.error(error);
    }
}

const initAuthors = async () => {
    const authors = [
        { name: "Eiichiro Oda", slug: "eiichiro-oda" },
        { name: "Akira Toriyama", slug: "akira-toriyama" },
        { name: "Masashi Kishimoto", slug: "masashi-kishimoto" },
        { name: "Takehiko Inoue", slug: "takehiko-inoue" },
        { name: "Naoko Takeuchi", slug: "naoko-takeuchi" },
        { name: "Kentaro Miura", slug: "kentaro-miura" },
        { name: "Hajime Isayama", slug: "hajime-isayama" },
        { name: "Yoshihiro Togashi", slug: "yoshihiro-togashi" },
        { name: "Rumiko Takahashi", slug: "rumiko-takahashi" },
        { name: "CLAMP", slug: "clamp" }
    ];

    const checkExistAuthors = await Author.findAll()

    if (checkExistAuthors.length > 0) {
        return;
    }

    try {
        const authorsInserted =
            await Author.bulkCreate(authors);
        console.log(authorsInserted);

    } catch (error) {
        console.error(error);
    }
}

const initStories = async () => {
    const stories = [
        {
            id: 1,
            name: "Hành trình phiêu lưu kỳ thú",
            slug: "hanh-trinh-phieu-luu-ky-thu",
            isFull: false,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Một cuộc phiêu lưu đầy bất ngờ và thú vị.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614074/webtruyen/images/stories/ohg29itdfqg4rwzpvwkj.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 2,
            name: "Tình yêu vượt thời gian",
            slug: "tinh-yeu-vuot-thoi-gian",
            isFull: true,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Câu chuyện tình yêu lãng mạn xuyên không gian và thời gian.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614178/webtruyen/images/stories/lqp2br7fpnwzhxnbxbuq.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 3,
            name: "Vùng đất kỳ bí",
            slug: "vung-dat-ky-bi",
            isFull: false,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Một vùng đất chứa đầy những điều huyền bí chưa được khám phá.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614236/webtruyen/images/stories/l3fo4e7cq4qesgunh3xp.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 4,
            name: "Thám tử lừng danh",
            slug: "tham-tu-lung-danh",
            isFull: true,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Những vụ án bí ẩn chờ được khám phá bởi một thám tử tài ba.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614328/webtruyen/images/stories/wu4uo2vv44fcfsv0tyek.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 5,
            name: "Cuộc chiến giữa các vị thần",
            slug: "cuoc-chien-giua-cac-vi-than",
            isFull: false,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Cuộc chiến khốc liệt giữa các vị thần trong thần thoại.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614387/webtruyen/images/stories/nrxmqbcqoebhh0nqvrc5.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 6,
            name: "Ký ức tuổi thơ",
            slug: "ky-uc-tuoi-tho",
            isFull: true,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Những kỷ niệm đẹp của tuổi thơ không thể nào quên.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614463/webtruyen/images/stories/p3fn4ttpnwfa1is8p7j3.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 7,
            name: "Lời nguyền bí ẩn",
            slug: "loi-nguyen-bi-an",
            isFull: false,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Một lời nguyền cổ xưa khiến số phận con người thay đổi.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614510/webtruyen/images/stories/fsx8spuxg0lmswmoadjz.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 8,
            name: "Thế giới tương lai",
            slug: "the-gioi-tuong-lai",
            isFull: true,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Một thế giới khoa học viễn tưởng với công nghệ tiên tiến.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614566/webtruyen/images/stories/mnqsyviymrxjnapjh8i8.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 9,
            name: "Bí mật hoàng gia",
            slug: "bi-mat-hoang-gia",
            isFull: false,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Những bí mật được giấu kín trong cung điện hoàng gia.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614624/webtruyen/images/stories/ji58clgbclckujs4n2zf.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        },
        {
            id: 10,
            name: "Huyền thoại chiến binh",
            slug: "huyen-thoai-chien-binh",
            isFull: true,
            access: StoryAccessEnum.PUBLIC,
            descriptions: "Truyền thuyết về những chiến binh bất khả chiến bại.",
            avatar: JSON.stringify({ url: "https://res.cloudinary.com/linhntb/image/upload/v1742614695/webtruyen/images/stories/xtt8bga5kfzf4uzjqmdj.jpg" }),
            type: StoryTypeEnum.WORD,
            AuthorId: Math.floor(Math.random() * 10) + 1,
            UserId: Math.floor(Math.random() * 10) + 1
        }
    ];
    const checkExistStories = await Story.findAll()

    if (checkExistStories.length > 0) {
        return;
    }

    try {
        const storiesInserted =
            await Story.bulkCreate(stories);
        console.log(storiesInserted);

    } catch (error) {
        console.error(error);
    }
}

const initCategoryStories = async () => {
    const uniquePairs = new Set();
    const data = [];

    while (data.length < 30) {
        const categoryId = Math.floor(Math.random() * 10) + 1;
        const storyId = Math.floor(Math.random() * 10) + 1;
        const key = `${categoryId}-${storyId}`;

        if (!uniquePairs.has(key)) {
            uniquePairs.add(key);
            data.push({ CategoryId: categoryId, StoryId: storyId });
        }
    }

    const checkExistCategoryStories = await CategoryStory.findAll()

    if (checkExistCategoryStories.length > 0) {
        return;
    }

    try {
        const categoryStoriesInserted =
            await CategoryStory.bulkCreate(data);
        console.log(categoryStoriesInserted);

    } catch (error) {
        console.error(error);
    }
}

const initChapters = async () => {
    const chapters = [];

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 5; j++) {
            chapters.push({
                number: `${j}`,
                name: `Chương ${j} của truyện ${i}`,
                content: `<h2>Chương ${j}</h2><p>Đây là nội dung của chương ${j} trong truyện số ${i}. Cốt truyện ngày càng hấp dẫn và lôi cuốn.</p>`,
                isFree: true,
                privateEnd: null,
                price: null,
                access: ChapterAccessEnum.PUBLIC,
                type: StoryTypeEnum.WORD,
                StoryId: i
            });
        }
    }

    const checkExistChapters = await Chapter.findAll()

    if (checkExistChapters.length > 0) {
        return;
    }

    try {
        const chaptersInserted =
            await Chapter.bulkCreate(chapters);
        console.log(chaptersInserted);

    } catch (error) {
        console.error(error);
    }
}


export const initDataCore = async () => {
    const permissions = await initPermissions()
    initRoles(permissions)
    initCategories()
    initUsers()
    initAuthors()
    initStories()
    initCategoryStories()
    initChapters()
}