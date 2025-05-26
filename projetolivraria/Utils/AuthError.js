export function errorFirebase(code) {
    switch (code) {
        case 'auth/invalid-email':
            return 'O email está em um formato inválido.';

        case 'auth/user-not-found':
            return 'Usuário não encontrado. Verifique o email.';

        case 'auth/invalid-credential':
            return 'Senha incorreta. Tente novamente.';

        case 'auth/email-already-in-use':
            return 'Este email já está em uso.';

        case 'auth/weak-password':
            return 'A senha precisa ter pelo menos 6 caracteres.';

        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';

        case 'auth/missing-password':
            return 'Digite a senha.'
            
        default:
            return `Erro ao autenticar: ${code}`;
    }
}
