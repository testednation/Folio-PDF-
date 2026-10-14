.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;


# instance fields
.field private zbd:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvg;

.field private zbe:Ljava/lang/String;

.field private zbf:Ljava/lang/String;

.field private zbg:Ljava/lang/String;

.field private zbh:Z

.field private zbi:Z

.field private zbj:Ljava/lang/String;

.field private zbk:Ljava/lang/String;

.field private zbl:Ljava/lang/String;

.field private zbm:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbn:Z

.field private zbo:Z

.field private zbp:Ljava/lang/String;

.field private zbq:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    .line 2
    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 2

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    .line 2
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvg;->zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvg;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbd:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvg;

    const-string v0, ""

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbe:Ljava/lang/String;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbf:Ljava/lang/String;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbg:Ljava/lang/String;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbj:Ljava/lang/String;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbk:Ljava/lang/String;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbl:Ljava/lang/String;

    .line 3
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v1

    iput-object v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbm:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbp:Ljava/lang/String;

    .line 4
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbq:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    return-void
.end method

.method public static zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpi;
    .locals 1

    .line 1
    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    invoke-virtual {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbq()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbtz;

    move-result-object v0

    check-cast v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpi;

    return-object v0
.end method

.method static synthetic zbc()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    return-object v0
.end method

.method static synthetic zbd(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;Ljava/lang/String;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbe:Ljava/lang/String;

    return-void
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
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpi;

    .line 4
    invoke-direct {p1, p2}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpi;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbph;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    .line 5
    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0xf

    new-array p1, p1, [Ljava/lang/Object;

    const/4 p2, 0x0

    const-string v0, "zbd"

    aput-object v0, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpj;->zba:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvf;

    aput-object p2, p1, p3

    const/4 p2, 0x2

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-string p3, "zbe"

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbf"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/16 p2, 0x8

    const-string p3, "zbl"

    aput-object p3, p1, p2

    const/16 p2, 0x9

    const-string p3, "zbm"

    aput-object p3, p1, p2

    const/16 p2, 0xa

    const-string p3, "zbn"

    aput-object p3, p1, p2

    const/16 p2, 0xb

    const-string p3, "zbg"

    aput-object p3, p1, p2

    const/16 p2, 0xc

    const-string p3, "zbo"

    aput-object p3, p1, p2

    const/16 p2, 0xd

    const-string p3, "zbp"

    aput-object p3, p1, p2

    const/16 p2, 0xe

    const-string p3, "zbq"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;

    .line 3
    const-string p3, "\u0004\u000e\u0000\u0000\u0001\u0010\u000e\u0001\u0002\u0000\u00012\u0004\u0007\u0005\u0208\u0006\u0208\u0007\u0208\u0008\u0007\t\u0208\n\u0208\u000b\u021a\u000c\u0007\r\u0208\u000e\u0007\u000f\u0208\u0010\u021a"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpk;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    :pswitch_5
    nop

    .line 1
    invoke-static {p3}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

    nop

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
