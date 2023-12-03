import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import jwtObj from '../../config/jwt';

export const hashPass = (pass) => {
    let hash = crypto.createHash('sha256');
    return hash.update(pass).digest('hex');
}

export const makeToken = (tokenType, id, userType, schoolId = null) => {
    let expiresIn = '24h';
    // let expiresIn = '10m';
    if (tokenType == 'refresh') {
        expiresIn = '30 days';
    }

    let token = jwt.sign(
        {
            id: id,
            userType: userType,
            schoolId: schoolId,
        },
        jwtObj.secret,
        { expiresIn: expiresIn },
    );

    return token;
}


