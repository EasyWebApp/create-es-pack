import { packageNameOf } from '../source/core';


describe('Utility methods',  () => {
    /**
     * @test {packageNameOf}
     */
    it(
        'gets legal Package name',
        () => packageNameOf('@EasyWebApp/ES-pack')
            .should.be.equal('@easywebapp/es-pack')
    );
});
