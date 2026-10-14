.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;


# instance fields
.field private zbd:I

.field private zbe:F

.field private zbf:F

.field private zbg:Z

.field private zbh:I

.field private zbi:I

.field private zbj:F

.field private zbk:I

.field private zbl:I

.field private zbm:F

.field private zbn:F

.field private zbo:Z


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 2

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    const v0, 0x3d4ccccd    # 0.05f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbe:F

    const/high16 v0, 0x3f000000    # 0.5f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbf:F

    const/16 v0, 0xa

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbh:I

    const/16 v1, 0xc8

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbi:I

    const v1, 0x3f4ccccd    # 0.8f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbj:F

    const/4 v1, 0x4

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbk:I

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbl:I

    const v0, 0x3e4ccccd    # 0.2f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbm:F

    const v0, 0x3dcccccd    # 0.1f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbn:F

    return-void
.end method

.method static synthetic zbc()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    return-object v0
.end method


# virtual methods
.method protected final zbb(ILjava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;
    .locals 1

    .line 2
    add-int/lit8 p1, p1, -0x1

    const/4 p2, 0x0

    const/4 p3, 0x1

    packed-switch p1, :pswitch_data_0

    :pswitch_0
    return-object p2

    .line 1
    :pswitch_1
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaih;

    .line 3
    invoke-direct {p1, p2}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaih;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaig;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0xc

    new-array p1, p1, [Ljava/lang/Object;

    const/4 p2, 0x0

    const-string v0, "zbd"

    aput-object v0, p1, p2

    const-string p2, "zbe"

    aput-object p2, p1, p3

    const/4 p2, 0x2

    const-string p3, "zbf"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbl"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-string p3, "zbm"

    aput-object p3, p1, p2

    const/16 p2, 0x8

    const-string p3, "zbn"

    aput-object p3, p1, p2

    const/16 p2, 0x9

    const-string p3, "zbo"

    aput-object p3, p1, p2

    const/16 p2, 0xa

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/16 p2, 0xb

    const-string p3, "zbg"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;

    const-string p3, "\u0001\u000b\u0000\u0001\u0001\u000b\u000b\u0000\u0000\u0000\u0001\u1001\u0000\u0002\u1001\u0001\u0003\u1004\u0003\u0004\u1004\u0004\u0005\u1004\u0006\u0006\u1004\u0007\u0007\u1001\u0008\u0008\u1001\t\t\u1007\n\n\u1001\u0005\u000b\u1007\u0002"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaii;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    .line 1
    :pswitch_5
    invoke-static {p3}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

    :pswitch_data_0
    .packed-switch 0x0
        :pswitch_5
        :pswitch_0
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
    .end packed-switch
.end method
