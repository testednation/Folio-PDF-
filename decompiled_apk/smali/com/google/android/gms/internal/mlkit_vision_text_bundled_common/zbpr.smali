.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;


# instance fields
.field private zbd:I

.field private zbe:I

.field private zbf:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbg:I

.field private zbh:Z

.field private zbi:I

.field private zbj:I

.field private zbk:Z

.field private zbl:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbxb;


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    .line 2
    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 1

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    .line 2
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbf:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    const/4 v0, 0x1

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbj:I

    return-void
.end method

.method static synthetic zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

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
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpq;

    .line 3
    invoke-direct {p1, p2}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpq;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpn;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    .line 4
    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0xa

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

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpp;

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbg"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/16 p2, 0x8

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/16 p2, 0x9

    const-string p3, "zbl"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;

    const-string p3, "\u0004\u0008\u0000\u0001\u0001\u0008\u0008\u0000\u0001\u0000\u0001\u1004\u0000\u0002\u001b\u0003\u1004\u0001\u0004\u1007\u0002\u0005\u1004\u0003\u0006\u1004\u0004\u0007\u1007\u0005\u0008\u1009\u0006"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpr;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

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
