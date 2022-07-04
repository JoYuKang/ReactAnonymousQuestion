import * as admin from 'firebase-admin';

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}
export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;

  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) {
      // 초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      // TODO: 환경을 초기화
      FirebaseAdmin.instance.bootstrap();
    }
    return FirebaseAdmin.instance;
  }

  private bootstrap(): void {
    if (!!admin.apps.length === true) {
      this.init = true;
      return;
    }
    const config: Config = {
      credential: {
        privateKey: (process.env.privateKey || '').replace(/\\n/g, '\n'),
        clientEmail: process.env.clientEmail || '',
        projectId: process.env.projectId || '',
      },
    };

    admin.initializeApp({
      databaseURL: config.databaseurl,
      credential: admin.credential.cert(config.credential),
    });
    console.log('bootstrap end');
  }

  /** firestore 반환 */
  public get Firestore(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.firestore();
  }

  /** auth 반환 */
  public get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.auth();
  }
}
